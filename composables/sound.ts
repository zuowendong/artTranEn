import { ref } from "vue";

const audio = new Audio();

export function useSound() {
  let currentIndex = ref(0);

  function getPronunciationUrl(english: string | undefined): string {
    return `https://dict.youdao.com/dictvoice?type=2&audio=${english}`;
  }

  function updateSource(src: string) {
    audio.src = src;
    audio.load();
    audio.play();
  }
  function handleSound(str: string) {
    const pronunciationUrl = getPronunciationUrl(str);
    updateSource(pronunciationUrl);
    audio.onended = null;
  }

  function handlePlayAll(strArr: string[]) {
    let currentIndex = 0;

    function playNext() {
      if (currentIndex < strArr.length) {
        const pronunciationUrl = getPronunciationUrl(strArr[currentIndex]);
        updateSource(pronunciationUrl);
        currentIndex++;
      }
    }

    audio.onended = playNext;
    playNext();
  }

  return {
    handleSound,
    handlePlayAll,
  };
}
