import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ADJUSTVOLUME } from '../../constants/toggleTypes'
import * as actions from '../../actions/actionCreator'
import classnames from 'classnames'


class Volume extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentVolume: this.props.defaultVolume
    }
  }

  static defaultProps = {
    maxVolume: 100
    , defaultVolume: 25
  };

  onInputChange = (event) => {
    const { changeVolumeF } = this.props
    const value = event.target.value
    changeVolumeF(value)
  }
  isAudioMute = () => {
    const { isMute, audioValue } = this.props
    return isMute || audioValue === '0'
  }

  render() {
    const {
      maxVolume, defaultVolume
      , muteOrUnmuteF, isMute, audioValue
      , isShowAdjustVolume
    } = this.props
    const volumeClass = classnames(
      "volume"
      , {
        "is-visible": isShowAdjustVolume
      }
    )
    const audioIsMute = this.isAudioMute();
    const actionClass = classnames(
      "fa"
      , {
        "fa-volume-down": audioIsMute
      }
      , {
        "fa-volume-up": !audioIsMute
      }
    )
    return (
      <div className={volumeClass}>
        <div className="volume-size">
          {audioIsMute ? 0 : audioValue}
        </div>
        <div className="volume-slider">
          <input
            type="range"
            max={maxVolume}
            min="0"
            defaultValue={defaultVolume}
            orient="vertical"
            onChange={this.onInputChange}
            onInput={this.onInputChange}
          />
        </div>
        <div
          className="volume-action"
          onClick={() => muteOrUnmuteF(isMute)}
          >
          <i className={actionClass} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { toggle, player } = state
  return {
    isShowAdjustVolume: toggle[ADJUSTVOLUME]
    , isMute: player.isMute
    , audioValue: player.audioValue
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeVolumeF: bindActionCreators(actions.changeVolumeF, dispatch)
    , muteOrUnmuteF: bindActionCreators(actions.muteOrUnmuteF, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Volume)
