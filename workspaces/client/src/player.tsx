import * as React from 'react';
import Hls from 'hls.js';
import { Nullable, isNotNull } from 'option-t/lib/Nullable';

type Props = {
  src: string;
};

export default class PlayerComponent extends React.Component<Props> {
  private hls: Nullable<Hls> = null;

  componentDidMount() {
    this._initPlayer();
  }

  componentDidUpdate() {
    this._initPlayer();
  }

  _initPlayer() {
    if (isNotNull(this.hls)) this.hls.destroy();

    const { src } = this.props;
    const hls = new Hls({ enableWorker: false });
    hls.loadSource(src);
    const video = document.getElementById('video') as HTMLVideoElement;
    hls.attachMedia(video);

    this.hls = hls;
  }

  componentWillUnmount() {
    if (isNotNull(this.hls)) this.hls.destroy();
  }

  render() {
    return (
      <video id='video' controls={true} autoPlay={true} style={{ width: '80vw' }}></video>
    );
  }
}
