import { FormatDatePipe } from "./format-date.pipe";

describe('FormatDatePipe', () => {
    let pipe: FormatDatePipe;

    beforeEach(() => {
        pipe = new FormatDatePipe();
    });

    it('should create a pipe instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return a date in the format 1', () => {
        const date = new Date('2025-12-16');
        const result = pipe.transform(date, 1);
        expect(result).toBe('16122025');
    });

    it('should return a date in the format 2', () => {
        const date = new Date('2025-12-16');
        const result = pipe.transform(date, 2);
        expect(result).toBe('16 / 12 / 2025');
    })

    it('should return a date in the format 3', () => {
        const date = new Date('2025-12-16');
        const result = pipe.transform(date, 3);
        expect(result).toBe('16/12/2025');
    })

    it('should return a date in the format 4', () => {
        const date = new Date('2025-12-16');
        const result = pipe.transform(date, 4);
        expect(result).toBe('2025-12-16');
    })
});