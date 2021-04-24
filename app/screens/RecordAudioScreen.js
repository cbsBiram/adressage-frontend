import React from "react";
import {
  Dimensions,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { Asset } from "expo-asset";
import { Audio } from "expo-av";
import { ImageBackground } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Font from "expo-font";
import * as Permissions from "expo-permissions";

import addressesApi from "../api/address";
import cloudinaryApi from "../api/cloudinary";
import colors from "../config/colors";
import AppButton from "../components/common/AppButton";
import UploadScreen from "./UploadScreen";

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

class AppImage {
  constructor(module) {
    this.module = module;
    Asset.fromModule(this.module).downloadAsync();
  }
}

const BACKGROUND_IMAGE = new AppImage(require("./../assets/road2.webp"));
const ICON_TRACK_1 = new Icon(require("../assets/images/track_1.png"), 166, 5);
const ICON_THUMB_1 = new Icon(require("../assets/images/thumb_1.png"), 18, 19);
const ICON_THUMB_2 = new Icon(require("../assets/images/thumb_2.png"), 15, 19);

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const BACKGROUND_COLOR = "#FFF8ED";
const LIVE_COLOR = "#FF0000";
const DISABLED_OPACITY = 0.5;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      haveRecordingPermissions: false,
      haveCameraRollingPermissions: false,
      isLoading: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      uploadVisible: false,
      progress: 0,
    };
    this.recordingSettings = JSON.parse(
      JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
    );
    // UNCOMMENT THIS TO TEST maxFileSize:
    // this.recordingSettings.android["extension"] = ".mpeg";
  }

  componentDidMount() {
    (async () => {
      await Font.loadAsync({
        "cutive-mono-regular": require("../assets/fonts/CutiveMono-Regular.ttf"),
      });
      this.setState({ fontLoaded: true });
    })();
    this._askForPermissions();
    this._askCameraRollPermissions();
  }

  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === "granted",
    });
  };

  _askCameraRollPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({
      haveCameraRollingPermissions: response.status === "granted",
    });
  };

  _updateScreenForSoundStatus = (status) => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _updateScreenForRecordingStatus = (status) => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };

  async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  }

  async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI());
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const { sound } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: this.state.muted,
        volume: this.state.volume,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });
  }

  _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  };

  _onPlayPausePressed = () => {
    if (this.sound != null) {
      if (this.state.isPlaying) {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.sound != null) {
      this.sound.stopAsync();
    }
  };

  _onMutePressed = () => {
    if (this.sound != null) {
      this.sound.setIsMutedAsync(!this.state.muted);
    }
  };

  _onVolumeSliderValueChange = (value) => {
    if (this.sound != null) {
      this.sound.setVolumeAsync(value);
    }
  };

  _onSeekSliderValueChange = (value) => {
    if (this.sound != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.sound.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async (value) => {
    if (this.sound != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.soundDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.sound.playFromPositionAsync(seekPosition);
      } else {
        this.sound.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return this.state.soundPosition / this.state.soundDuration;
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  }

  _getPlaybackTimestamp() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.soundPosition
      )} / ${this._getMMSSFromMillis(this.state.soundDuration)}`;
    }
    return "";
  }

  _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }

  async uploadRecFromPhone() {
    const cloudUri = await FileSystem.readAsStringAsync(
      this.recording.getURI(),
      {
        encoding: "base64",
      }
    );
    const base64Aud = `data:audio/mpeg;base64,${cloudUri}`;

    const response = await cloudinaryApi.uploadAudio(
      `${base64Aud}`,
      (progress) => this.setState({ progress })
    );
    if (response.ok) {
      let {
        data: { secure_url: recordingURL },
      } = response;
      this.setState({ recordingURL });

      const { address } = this.props.route.params;
      const duration = this._getRecordingTimestamp();
      const uri = this.state.recordingURL;

      address.uri = uri;
      address.duration = duration;

      const result = await addressesApi.addAddress(address, (progress) =>
        this.setState({ progress })
      );
      if (!result.ok) return alert("Votre audio n'a pas pu être enregistré.");

      this.props.navigation.navigate("Accueil", { afterRecord: true });
    } else {
      alert("Le fichier n'a pas pu être uploadé.");
    }
  }

  render() {
    if (!this.state.fontLoaded) {
      return <View style={styles.emptyContainer} />;
    }

    if (
      !this.state.haveRecordingPermissions ||
      !this.state.haveCameraRollingPermissions
    ) {
      return (
        <View style={styles.container}>
          <View />
          <Text
            style={[
              styles.noPermissionsText,
              { fontFamily: "cutive-mono-regular" },
            ]}
          >
            You must enable audio recording permissions in order to use this
            functionaliy.
          </Text>
          <View />
        </View>
      );
    }

    return (
      <>
        <UploadScreen
          onDone={() => this.setState({ uploadVisible: false })}
          progress={this.state.progress}
          visible={this.state.uploadVisible}
        />
        <ImageBackground style={styles.image} source={BACKGROUND_IMAGE.module}>
          <View style={styles.container}>
            <View
              style={[
                {
                  opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
                },
              ]}
            >
              <View style={styles.recordingContainer}>
                <TouchableHighlight
                  underlayColor={BACKGROUND_COLOR}
                  style={styles.wrapper}
                  onPress={this._onRecordPressed}
                  disabled={this.state.isLoading}
                >
                  <MaterialCommunityIcons
                    name="microphone"
                    style={{ marginTop: 35 }}
                    size={60}
                    color={colors.primary}
                  />
                </TouchableHighlight>
                <View style={styles.recordingDataContainer}>
                  <Text
                    style={[
                      styles.liveText,
                      {
                        fontFamily: "cutive-mono-regular",
                        fontWeight: "bold",
                        fontSize: 18,
                      },
                    ]}
                  >
                    {this.state.isRecording ? "LIVE" : ""}
                  </Text>
                  <View style={styles.recordingDataRowContainer}>
                    <MaterialCommunityIcons
                      name="record-rec"
                      size={40}
                      color={colors.primary}
                    />
                    <Text
                      style={[
                        styles.recordingTimestamp,
                        {
                          fontFamily: "cutive-mono-regular",
                          fontSize: 20,
                          fontWeight: "bold",
                        },
                      ]}
                    >
                      {this._getRecordingTimestamp()}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.playbackContainer}>
                <Slider
                  style={styles.playbackSlider}
                  trackImage={ICON_TRACK_1.module}
                  thumbImage={ICON_THUMB_1.module}
                  value={this._getSeekSliderPosition()}
                  onValueChange={this._onSeekSliderValueChange}
                  onSlidingComplete={this._onSeekSliderSlidingComplete}
                  disabled={
                    !this.state.isPlaybackAllowed || this.state.isLoading
                  }
                />
                <Text
                  style={[
                    styles.playbackTimestamp,
                    {
                      fontFamily: "cutive-mono-regular",
                      fontSize: 18,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {this._getPlaybackTimestamp()}
                </Text>
              </View>

              <View style={styles.volumeContainer}>
                <TouchableHighlight
                  underlayColor={BACKGROUND_COLOR}
                  style={styles.wrapper}
                  onPress={this._onMutePressed}
                  disabled={
                    !this.state.isPlaybackAllowed || this.state.isLoading
                  }
                >
                  {this.state.muted ? (
                    <MaterialCommunityIcons
                      name="volume-off"
                      size={50}
                      style={styles.icon}
                      color={colors.primary}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="volume-high"
                      size={50}
                      style={styles.icon}
                      color={colors.primary}
                    />
                  )}
                </TouchableHighlight>
                <Slider
                  style={styles.volumeSlider}
                  trackImage={ICON_TRACK_1.module}
                  thumbImage={ICON_THUMB_2.module}
                  value={1}
                  onValueChange={this._onVolumeSliderValueChange}
                  disabled={
                    !this.state.isPlaybackAllowed || this.state.isLoading
                  }
                />
                <TouchableHighlight
                  underlayColor={BACKGROUND_COLOR}
                  style={styles.wrapper}
                  onPress={this._onPlayPausePressed}
                  disabled={
                    !this.state.isPlaybackAllowed || this.state.isLoading
                  }
                >
                  {this.state.isPlaying ? (
                    <MaterialCommunityIcons
                      name="pause"
                      size={50}
                      style={[styles.icon, { marginLeft: 50 }]}
                      color={colors.primary}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="play"
                      size={50}
                      style={[styles.icon, { marginLeft: 50 }]}
                      color={colors.primary}
                    />
                  )}
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={BACKGROUND_COLOR}
                  style={styles.wrapper}
                  onPress={this._onStopPressed}
                  disabled={
                    !this.state.isPlaybackAllowed || this.state.isLoading
                  }
                >
                  <MaterialCommunityIcons
                    name="stop"
                    size={50}
                    style={[styles.icon, { marginLeft: 20 }]}
                    color={colors.primary}
                  />
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <AppButton
                  icon="content-save"
                  title="Enregistrer"
                  onPress={() => this.uploadRecFromPhone()}
                />
                <AppButton
                  icon="keyboard-backspace"
                  title="Retour"
                  onPress={() => this.props.navigation.goBack()}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    marginBottom: 150,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    minHeight: DEVICE_HEIGHT,
    maxHeight: DEVICE_HEIGHT,
  },
  emptyContainer: {
    alignSelf: "stretch",
    backgroundColor: BACKGROUND_COLOR,
  },
  image: {
    // backgroundColor: BACKGROUND_COLOR,
    width: "100%",
    height: "100%",
    flex: 1,
  },
  icon: {
    marginBottom: 200,
  },
  liveText: {
    color: LIVE_COLOR,
    marginTop: 10,
  },
  noPermissionsText: {
    textAlign: "center",
  },
  playbackContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    minHeight: 30,
    maxHeight: 30,
    paddingTop: 90,
  },
  playbackSlider: {
    alignSelf: "stretch",
  },
  playbackTimestamp: {
    textAlign: "right",
    alignSelf: "stretch",
    paddingRight: 20,
  },
  recordingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingLeft: 20,
    paddingTop: 60,
    minHeight: 70,
    maxHeight: 70,
  },
  recordingDataContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 100,
    maxHeight: 100,
    minWidth: 100 * 3.0,
    maxWidth: 100 * 3.0,
  },
  recordingDataRowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 60,
    maxHeight: 60,
  },
  recordingTimestamp: {
    paddingTop: 0,
  },
  volumeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
    marginTop: 80,
    minWidth: DEVICE_WIDTH / 4.0,
    maxWidth: DEVICE_WIDTH / 4.0,
  },
  volumeSlider: {
    marginBottom: 200,
    width: DEVICE_WIDTH / 2.0 - 60,
  },
  wrapper: {},
});
