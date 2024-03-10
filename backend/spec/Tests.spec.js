import axios from 'axios';
import request from 'supertest';
import assert from 'assert';

describe('Parse Server example', () => {
  // Enable unsafe current user for Parse
  Parse.User.enableUnsafeCurrentUser();

  // Test: Coverage for /test route
  it('coverage for /test', async () => {
    const { data, headers } = await axios.get('http://localhost:30001/test');
    // Assert content type and response body
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

      // Save the object and assert the result
      await testObject.save().then((result) => {
        sampleObject.objectId = result.id;
        assert.ok(result.id);
      });
    });

    // Update operation
    it('should update the object', async () => {
      const TestObject = Parse.Object.extend(sampleObject.className);
      const query = new Parse.Query(TestObject);

      // Get the object by ID and update its key
      const result = await query.get(sampleObject.objectId);
      result.set('key', 'updatedValue');

      // Save the updated object and assert the result
      await result.save().then((updatedObject) => {
        assert.strictEqual(updatedObject.get('key'), 'updatedValue');
      });
    });

    // Delete operation
    it('should delete the object', async () => {
      const TestObject = Parse.Object.extend(sampleObject.className);
      const query = new Parse.Query(TestObject);

      // Get the object by ID and delete it
      await query.get(sampleObject.objectId).then(async (result) => {
        await result.destroy().then(() => {
          assert.ok(true);
        });
      });
    });
  });
});
