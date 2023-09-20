import Contact from "../../shared/types/Contact";
import DuplicateProcessor from '../src/duplicateProcessor';

let contactsJohnMock1: Contact[] = [];
let undefinedNameMock1: Contact[] = [];
beforeAll(() => {
    const contact1: Contact = {
        _id: '1',
        firstName: 'John',
        lastName: 'Smith',
        alias: [],
        primaryPhone: '1234567890',
    };
    const contact2: Contact = {
        _id: '2',
        firstName: 'John',
        lastName: 'Ray',
        alias: []
    };
    const contact3: Contact = {
        _id: '3',
        firstName: 'John',
        alias: [],
        primaryPhone: '1234567890',
    };
    const contact4: Contact = {
        _id: '4',
        firstName: 'John',
        lastName: 'Ray',
        alias: []
    };
    const contact5: Contact = {
        _id: '5',
        alias: []
    };
    const contact6: Contact = {
        _id: '6',
        alias: []
    };
    contactsJohnMock1 = [contact1, contact2, contact3, contact4];
    undefinedNameMock1 = [contact5, contact6];
});

test('example test', () => {
    expect(2+2).toBe(4);
});
 
test('general functionality test', () => {
    const dp = new DuplicateProcessor(contactsJohnMock1);
    const potentialDuplicates = dp.getPotentialDuplicates();
    console.log(potentialDuplicates);
    expect(potentialDuplicates['1']).toContain('3');
});

test('two undefined names should not be flagged as dupes test', () => {
    const dp = new DuplicateProcessor(undefinedNameMock1);
    const potentialDuplicates = dp.getPotentialDuplicates();
    expect(potentialDuplicates).toStrictEqual({});
});

