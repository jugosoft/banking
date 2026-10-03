export const EVENT_PATH_SCROLL = [
    '$event.target.scrollTop',
    '$event.target.scrollHeight',
    '$event.target.offsetHeight',
];

export const EVENT_SCROLL = 'scroll';

export interface IScroll {
    y: number;
    height: number;
}
