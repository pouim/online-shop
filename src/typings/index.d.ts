interface ResizeObserver {
    observe(target: Element): void;
    unobserve(target: Element): void;
    disconnect(): void;
  }

  declare module 'react-reveal/Fade';  
  declare module 'react-text-mask';
  declare module 'moment-jalaali';
  declare module 'moment/locale/fa';
  declare module 'react-rating-stars-component';
  declare module 'react-lazy-load-image-component';
  declare module 'nprogress';
  declare module 'react-hot-toast';
  declare module 'reactjs-mappletooltip';
  declare module 'persian-tools2';

 

  interface CartItem {
    title: string;
    image: string;
    color: string;
    warranty: string;
    amount: number;
    price: number;
  }