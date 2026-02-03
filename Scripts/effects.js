// Typing Effect for "Effect-Write" Text
document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.getElementById("Effect-Write");
    if (!textElement) {
      console.error("Element with ID 'Effect-Write' not found.");
      return;
    }
  
    const phrases = [
      "Hi, I'm Muhammad Irfan.",
      "A passionate Learner of Technology",
      "Welcome to my portfolio !"
    ];
    const typingSpeed = 50; // Speed in milliseconds
    const erasingSpeed = 30; // Speed for erasing
    const delayBetweenPhrases = 2000; // Delay before erasing starts
    let phraseIndex = 0;
    let charIndex = 0;
    let isErasing = false;
  
    function typeText() {
      const currentPhrase = phrases[phraseIndex];
      if (!isErasing) {
        // Typing
        if (charIndex < currentPhrase.length) {
          textElement.textContent += currentPhrase.charAt(charIndex);
          charIndex++;
          setTimeout(typeText, typingSpeed);
        } else {
          // Pause before erasing
          setTimeout(() => {
            isErasing = true;
            typeText();
          }, delayBetweenPhrases);
        }
      } else {
        // Erasing
        if (charIndex > 0) {
          textElement.textContent = currentPhrase.substring(0, charIndex - 1);
          charIndex--;
          setTimeout(typeText, erasingSpeed);
        } else {
          // Move to the next phrase
          isErasing = false;
          phraseIndex = (phraseIndex + 1) % phrases.length; // Loop back to the first phrase
          setTimeout(typeText, typingSpeed);
        }
      }
    }
  
    typeText();
  });