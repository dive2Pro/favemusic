import React from 'react'
import Waveform from 'waveform.js'
import { normalizeSamples, isJsonWaveform, isPngWaveform, geneWaveFormElementId } from '../../services/track'

class WaveformContainer extends React.Component {
  componentDidMount() {
    const { track, id, idx } = this.props
    this.renderWaveform(track, geneWaveFormElementId(id, idx))
  }

  renderWaveform = (track, elementId) => {
    const container = document.getElementById(elementId)
    const { waveform_url } = track

    isJsonWaveform(waveform_url) && (
      fetch(waveform_url)
        .then(response => response.json())
        .then(data => {
          new Waveform({
            container
            , innerColor: '#61B25A'
            , data: normalizeSamples(data.samples)
          })
        })
        .catch(err => {
          console.log(err);
        })
    )

    isPngWaveform(waveform_url) && (
      new Waveform({
        container
        , innerColor: '#61b25a'
      }).dataFromSoundCloudTrack(track)
    )
  }

  render() {
    const { id, idx } = this.props
    return (
      <div id={`waveform-${id}-${idx}`} className="track-waveform-json">
      </div>
    )
  }
}

export default WaveformContainer
