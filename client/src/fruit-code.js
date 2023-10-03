export function getRandomFruitOrVegetableWithEmoji() {
  const items = [
    { name: 'Apple', emoji: '🍎' },
    { name: 'Banana', emoji: '🍌' },
    { name: 'Carrot', emoji: '🥕' },
    { name: 'Grapes', emoji: '🍇' },
    { name: 'Lemon', emoji: '🍋' },
    { name: 'Orange', emoji: '🍊' },
    { name: 'Pear', emoji: '🍐' },
    { name: 'Strawberry', emoji: '🍓' },
    { name: 'Tomato', emoji: '🍅' },
    { name: 'Watermelon', emoji: '🍉' },
    { name: 'Pineapple', emoji: '🍍' },
    { name: 'Kiwi', emoji: '🥝' },
    { name: 'Cherry', emoji: '🍒' },
    { name: 'Mango', emoji: '🥭' },
    { name: 'Peach', emoji: '🍑' },
    { name: 'Blueberry', emoji: '🫐' },
    { name: 'Avocado', emoji: '🥑' },
    { name: 'Cucumber', emoji: '🥒' },
    { name: 'Eggplant', emoji: '🍆' },
  ];

  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}