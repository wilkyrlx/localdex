import Contact from "../../shared/types/Contact";
import DuplicateProcessor from '../src/duplicateProcessor';


test('example test', () => {
    expect(1 + 1).toBe(2);
});

test('duplicateProcessor test', () => {
    const contact1: Contact = {
        _id: '1',
        firstName: 'John',
        lastName: 'Smith',
        alias: []
    };
    const contact2 = {
        _id: '2',
        firstName: 'John',
        lastName: 'Ray',
        alias: []
    };
    const contact3 = {
        _id: '3',
        firstName: 'Bob',
        lastName: 'X',
        alias: []
    };
    const contact4 = {
        _id: '4',
        firstName: 'John',
        lastName: 'Ray',
        alias: []
    };
    const dp = new DuplicateProcessor([contact1, contact2, contact3, contact4]);
    const potentialDuplicates = dp.getPotentialDuplicates();
    console.log(potentialDuplicates);
    expect(potentialDuplicates['1']).toBeDefined();
});