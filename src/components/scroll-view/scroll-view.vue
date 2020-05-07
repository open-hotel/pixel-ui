<template>
  <div class="px-scroll-view">
    <slot />
  </div>
</template>

<style lang="stylus">
.px-scroll-view {
  flex: 1;
  overflow: auto;
  width: 100%;
  height: 100%;

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    border: 1px solid #000;
    background: #DDD;
    box-shadow: inset 0 0 1px 1px rgba(#000, 20%);
  }

  &::-webkit-scrollbar-thumb {
    border: 1px solid #000;
    border-radius: 4px;
    background-size: 50% 4px;
    background-position: 50% 0;
    background-repeat: repeat-y;
    background-color: #fff;
    background-image: linear-gradient(to bottom, transparent 2px, #aaa 2px, #aaa 3px);
  }

  &::-webkit-scrollbar-button: {
    background: yellow;
  }

  &::-webkit-scrollbar-button:single-button {
    width: 1em;
    height: 16px;
    background: #FFF;
    border: 1px solid #000;
    background-repeat: no-repeat;
    background-position: center;

    &:single-button:vertical:decrement {
      border-radius: 4px 4px 0 0;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAASElEQVQYV12PAQ4AIAgC4f+ProlSlHNtKnJJRBDAUgJUdlSDM1SDI9KgBRLXc7aqn8Vxsjhx3g5RY01+bC/W+P7Wj7ObD/ENG2ApEwkJ3CuQAAAAAElFTkSuQmCC');

      &:before {
        content: '';
        display: block;
        width: 4px;
        height: 4px;
        background: red;
      }
    }

    &:single-button:vertical:increment {
      border-radius: 0 0 4px 4px;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAAQElEQVQYV12OQQ4AMAjC4P+PdmETR/RgIjZVAiiq4ZfmXTdjc4IT8lwADYovW/MCAY7AC5nD0sfeE1e5/htx5geodREGV1GNTwAAAABJRU5ErkJggg==');
    }
  }
}
</style>
