import * as Node from '/helpers/node';


describe('node helpers', () => {
    describe('getNodeParamNormalizedValue()', () => {
        it('returns correct value', () => {
            const nodeMock = {
                minValue: 0,
                maxValue: 20000,
                value: 420,
            };

            const expectedResult = 2.1; // percent presentation of 420 of 20000
            const result = Node.getNodeParamNormalizedValue(nodeMock);

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
            const result = Node.setNodeParamNormalizedValue(nodeMock, value);

            expect(result.value).toBe(expectedResult);
        });
    });
});