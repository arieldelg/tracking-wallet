const toogleClass = (event: HTMLDivElement | null) => {
  const arrow = event?.getElementsByClassName("ArrowMenu");
  const dropdownButton = event?.getElementsByClassName("DropDownMenuButton");
  const dropdown = event?.getElementsByClassName("DropDownMenu");

  if (!arrow || !dropdownButton || !dropdown) return;

  const trueClassButton = dropdownButton[0].classList.contains(
    "animate-translateDescDownButton"
  );
  const trueClassContainer = dropdown[0].classList.contains(
    "animate-translateDescDown"
  );
  const trueClass = arrow[0].classList.contains("animate-rotate0_180");

  if (trueClass && trueClassButton && trueClassContainer) {
    arrow[0].classList.add("animate-rotate180_0");
    arrow[0].classList.remove("animate-rotate0_180");
    dropdownButton[0].classList.add("animate-translateDescUpButton");
    dropdownButton[0].classList.remove("animate-translateDescDownButton");
    dropdown[0].classList.add("animate-translateDescUp");
    dropdown[0].classList.remove("animate-translateDescDown");
  } else {
    arrow[0].classList.add("animate-rotate0_180");
    arrow[0].classList.remove("animate-rotate180_0");
    dropdownButton[0].classList.add("animate-translateDescDownButton");
    dropdownButton[0].classList.remove("animate-translateDescUpButton");
    dropdown[0].classList.add("animate-translateDescDown");
    dropdown[0].classList.remove("animate-translateDescUp");
  }
};

export default toogleClass;
