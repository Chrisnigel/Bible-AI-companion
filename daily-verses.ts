export const dailyVerses = [
    {
      id: 1,
      reference: 'John 3:16',
      text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      translation: 'kjv',
    },
    {
      id: 2,
      reference: 'Psalm 23:1',
      text: "The LORD is my shepherd; I shall not want.",
      translation: 'kjv',
    },
    {
      id: 3,
      reference: 'Philippians 4:13',
      text: "I can do all things through Christ which strengtheneth me.",
      translation: 'kjv',
    },
    {
      id: 4,
      reference: 'Jeremiah 29:11',
      text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
      translation: 'kjv',
    },
    {
      id: 5,
      reference: 'Romans 8:28',
      text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
      translation: 'kjv',
    },
    {
      id: 6,
      reference: 'Proverbs 3:5-6',
      text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
      translation: 'kjv',
    },
    {
      id: 7,
      reference: 'Isaiah 40:31',
      text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
      translation: 'kjv',
    },
  ];
  
  export function getRandomDailyVerse() {
    const randomIndex = Math.floor(Math.random() * dailyVerses.length);
    return dailyVerses[randomIndex];
  }