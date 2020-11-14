import {getNodeParamNormalizedValue, setNodeParamNormalizedValue} from '../node';


describe('node helpers', () => {
    describe('getNodeParamNormalizedValue()', () => {
        it('returns correct value', () => {
            const nodeMock = {
                minValue: 0,
                maxValue: 20000,
                value: 420,
            };

            const expectedResult = nodeMock.value / (nodeMock.maxValue / 100); // = 2.1; percent presentation of 420 of 20000
            const result = getNodeParamNormalizedValue(nodeMock as AudioParam);

            expect(result).toBe(expectedResult);
        });
    });

    describe('setNodeParamNormalizedValue()', () => {
        it('returns node containing raw value', () => {
            const nodeMock = {
                minValue: 0,
                maxValue: 20000,
                value: 20000,
            };

            const value = 2.1;
            const expectedResult = 420;
            const result = setNodeParamNormalizedValue(nodeMock as AudioParam, value);

            expect(result.value).toBe(expectedResult);
        });
    });
});