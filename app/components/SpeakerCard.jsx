import React from "react";

const SpeakerCard = () => {
  return (
    <div className="flex">
      <div>
        <img src="/speaker1.png" />
      </div>
      <div>
        <h3>Dr. Vikram Subramaniam</h3>
        <h4>Chief Guest</h4>
        <p>
          Introducing Dr. Vikram Subramanian, a luminary in South Indian
          medicine, blending traditional wisdom with modern innovation. With
          over two decades of experience and a degree from Madras Medical
          College, Dr. Subramanian is renowned for his expertise in Ayurveda and
          holistic healthcare.{" "}
        </p>
      </div>
    </div>
  );
};

export default SpeakerCard;
