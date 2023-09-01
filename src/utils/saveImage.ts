import html2canvas from "html2canvas";
export async function saveImage() {
  const element = document.getElementById("single-analogy");
  const voting = document.getElementById("voting");
  const votingAverage = document.getElementById("votingAverage");
  const singleAnalogyCat = document.getElementById("single-analogy-cat");
  const singleAnalogyTopic = document.getElementById(
    "single-analogy-topic"
  );
  const analogyAuthor = document.getElementById("analogy-author");


  // Store the original styles
  if (element) {
    const originalStyles = {
      borderRadius: element.style.borderRadius,
      border: element.style.borderColor,
      paddingBottom: element.style.paddingBottom,
      paddingTop: element.style.paddingTop,
      maxHeight: "100%",
      height: "100%",
      backgroundImage: element.style.backgroundImage,
    };

    // Apply new styles
    element.style.borderRadius = "0px";
    element.style.backgroundImage = "linear-gradient(to left bottom, #1e7cba, #7c1db3)"
    element.style.maxHeight = "1000px"
    element.style.border = "0px transparent"

    if (voting) {
      voting.style.visibility = "hidden";
      voting.style.height = "10px";
    }
    if (votingAverage) {
      votingAverage.style.visibility = "hidden";
      votingAverage.style.height = "16px";
    }
    if (singleAnalogyCat) {
      singleAnalogyCat.style.overflowX = "clip";
      singleAnalogyCat.style.overflow = "unset";
      singleAnalogyCat.style.textOverflow = "unset";
      singleAnalogyCat.style.whiteSpace = "unset";
      singleAnalogyCat.style.maxWidth = "100%"
    }
    if (singleAnalogyTopic) {
      singleAnalogyTopic.style.overflowX = "clip";
      singleAnalogyTopic.style.overflow = "unset";
      singleAnalogyTopic.style.textOverflow = "unset";
      singleAnalogyTopic.style.whiteSpace = "unset";
      singleAnalogyTopic.style.maxWidth = "100%"
    }
    if (analogyAuthor) {
      analogyAuthor.style.display = "flex";
    }

    // Capture the image
    await html2canvas(element).then(async (canvas) => {
      // Revert the changes by applying the original styles
      for (const style in originalStyles) {
        element.style[style] = originalStyles[style];
      }
      // Export canvas to image
      const dataURL = canvas.toDataURL("image/png");

      // Create a link and click to download
      const link = document.createElement("a");
      link.download = "myAnalogy.png";
      link.href = dataURL;
      link.click();
    });
  }
}
