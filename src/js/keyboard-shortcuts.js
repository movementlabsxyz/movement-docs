import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function navigatePage(direction) {
  const navElement = document.querySelector(
    `.pagination-nav__link--${direction}`
  );
  if (navElement) {
    navElement.click();
  }
}

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener("keydown", (event) => {
    
  // Check if no input is focused
  if (
    document.activeElement.tagName !== "INPUT" &&
    document.activeElement.tagName !== "TEXTAREA"
  ) {
    if (event.key === "ArrowLeft") {
      navigatePage("prev");
    }

    if (event.key==="ArrowRight") {
      navigatePage("next");
    }
  }
});


}




