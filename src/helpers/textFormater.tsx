"use client";

const formatDescription = (
  description: string,
  maxLength: number = 100
): string => {
  if (description.length <= maxLength) {
    return description;
  }

  let truncated = description.substr(0, maxLength);
  let lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex > 0) {
    truncated = truncated.substr(0, lastSpaceIndex);
  }

  return truncated.trim() + "...";
};

export default formatDescription;
