const prefixes = ["Dark", "Shadow", "Neon", "Cyber", "Phantom", "Storm", "Iron", "Ghost", "Red", "Blue"];
const suffixes = ["Slayer", "Hunter", "Wolf", "Blade", "Reaper", "Wizard", "Ninja", "King", "Queen", "Mage"];
const separators = ["", "_", "-", "X", "0", "7"];

export const generateNickname = () => {
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const randomSeparator = separators[Math.floor(Math.random() * separators.length)];

    // Собираем никнейм
    let nickname;
    if (randomSeparator === "") {
        nickname = randomPrefix + randomSuffix;
    } else {
        nickname = randomPrefix + randomSeparator + randomSuffix;
    }

    return nickname;
}

export const correctYearWord = (count) => {
    if (count % 10 === 1) return "год";
    if (count % 10 > 1 || count % 10 < 5) return "года";
    return "лет";
}