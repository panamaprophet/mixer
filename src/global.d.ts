declare module "*.css" {
    const styles: {[className: string]: string};

    export default styles;
}

interface Window {
    webkitAudioContext: typeof AudioContext;
}