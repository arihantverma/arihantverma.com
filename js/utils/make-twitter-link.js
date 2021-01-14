const makeTwitterLink = ({
  text = "",
  url = "",
  related = "",
  hashtags = "",
  additionalTwitterHandles = []
}) => {

  const defaultHashtags = "marketingtwitter";

  let additionalTwitterHandlesText = "";

  additionalTwitterHandles.forEach((handle, index) => {
    const isLast = index === additionalTwitterHandles.length - 1;
    additionalTwitterHandlesText += `@${handle}${isLast ? " " : ""}`;
  });

  const twitterText = `${text} ${additionalTwitterHandlesText}`;

  const link = `https://twitter.com/intent/tweet?text=${twitterText}&url=${url}&via=gdadsriver&related=${related}&hashtags=${defaultHashtags}${
    hashtags ? "," : ""
    }${hashtags}`;

  return link;
};

module.exports = makeTwitterLink;
