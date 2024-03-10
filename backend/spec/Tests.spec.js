import axios from 'axios';
import request from 'supertest'; // Import 'request' for Landmark API tests
import assert from 'assert';

describe('Parse Server example', () => {
  Parse.User.enableUnsafeCurrentUser();

  // Test: Coverage for /test route
  it('coverage for /test', async () => {
    const { data, headers } = await axios.get('http://localhost:30001/test');
    expect(headers['content-type']).toContain('text/html');
    expect(data).toContain('<title>Parse Server Example</title>');
  });

  // Landmark API Tests
  describe('Landmark API Tests', () => {
    const sampleObject = {
      className: 'landmark',
      objectId: null,
      key: 'value',
    };
    
    // Create operation
    it('should create a new object', async () => {
      const TestObject = Parse.Object.extend(sampleObject.className);
      const testObject = new TestObject();
      testObject.set('key', sampleObject.key);
  
      await testObject.save().then((result) => {
        sampleObject.objectId = result.id;
        assert.ok(result.id);
      });
    });

    // Update operation
    it('should update the object', async () => {
      const TestObject = Parse.Object.extend(sampleObject.className);
      const query = new Parse.Query(TestObject);
      const result = await query.get(sampleObject.objectId);
      result.set('key', 'updatedValue');

      await result.save().then((updatedObject) => {
        assert.strictEqual(updatedObject.get('key'), 'updatedValue');
      });
    });

    // Delete operation
    it('should delete the object', async () => {
      const TestObject = Parse.Object.extend(sampleObject.className);
      const query = new Parse.Query(TestObject);
      
      await query.get(sampleObject.objectId).then(async (result) => {
        await result.destroy().then(() => {
          assert.ok(true);
        });
      });
    });
  });
});
