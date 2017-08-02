export function placePlant(plant, index) {
  return {
    type: "PLACE_PLANT",
    plant,
    index
  };
}

export function changePlant(plant) {
  return {
    type: "CHANGE_PLANT",
    plant
  };
}
