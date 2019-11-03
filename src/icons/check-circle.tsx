import React from 'react';
import { SVGAttributes } from 'react';

export const CheckCircle = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M11.48,23.5h0a11.5,11.5,0,0,1,0-23h0a11.38,11.38,0,0,1,4.67,1,1,1,0,0,1-.85,1.91,9.31,9.31,0,0,0-3.82-.81h0a9.41,9.41,0,0,0,0,18.82h0A9.4,9.4,0,0,0,20.87,12V11A1,1,0,1,1,23,11v1A11.49,11.49,0,0,1,11.48,23.5Z" />
      <path d="M11.48,15.14a1,1,0,0,1-.74-.31L7.61,11.7a1,1,0,0,1,1.48-1.48l2.39,2.4L22.22,1.86a1,1,0,0,1,1.48,1.48L12.22,14.84A1,1,0,0,1,11.48,15.14Z" />
    </svg>
  );
};
