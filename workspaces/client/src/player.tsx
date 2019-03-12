import * as React from 'react';
import Hls from 'hls.js';

console.log(Hls.isSupported());

type Props = {
  src: string;
};

export default class PlayerComponent extends React.Component<Props> {
  private hls: Hls;
  private player: HTMLVideoElement | null = null;

  constructor(props: Props) {
    super(props);
    this.hls = new Hls();
  }

  componentDidMount() {
    if (this.player === null) return;

    this.hls.attachMedia(this.player);
    this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      console.log("video and hls.js are now bound together !");
      this.hls.loadSource(this.props.src);
      this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        console.log("manifest loaded, found " + data.levels.length + " quality level");
        if (this.player !== null) this.player.play();
      });
    });
  }

  render() {
    return (<video ref={player => {this.player = player;}} preload="none" autoPlay={true}></video>);
  }
}
