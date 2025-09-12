import React from "react";
import './SkeletonCard.css'

 const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-lines">
        <div className="skeleton-line_short"></div>
        <div className="skeleton-line_long"></div>
      </div>
    </div>
  );
};


export default SkeletonCard;