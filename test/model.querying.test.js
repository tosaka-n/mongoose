
/**
 * Test dependencies.
 */

var start = require('./common')
  , should = require('should')
  , mongoose = start.mongoose
  , random = require('mongoose/utils').random
  , Query = require('mongoose/query')
  , Schema = mongoose.Schema
  , SchemaType = mongoose.SchemaType
  , CastError = SchemaType.CastError
  , ObjectId = Schema.ObjectId
  , DocumentObjectId = mongoose.Types.ObjectId;

/**
 * Setup.
 */

var Comments = new Schema();

Comments.add({
    title     : String
  , date      : Date
  , body      : String
  , comments  : [Comments]
});

var BlogPostB = new Schema({
    title     : String
  , author    : String
  , slug      : String
  , date      : Date
  , meta      : {
        date      : Date
      , visitors  : Number
    }
  , published : Boolean
  , mixed     : {}
  , numbers   : [Number]
  , tags      : [String]
  , owners    : [ObjectId]
  , comments  : [Comments]
});

mongoose.model('BlogPostB', BlogPostB);
var collection = 'blogposts_' + random();

var ModSchema = new Schema({
  num: Number
});
mongoose.model('Mod', ModSchema);

module.exports = {
  'test that find returns a Query': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);
    
    // query
    BlogPostB.find({}).should.be.an.instanceof(Query);
//    BlogPostB.find({}).executed.should.be.false;

    // query, fields
    BlogPostB.find({}, {}).should.be.an.instanceof(Query);
//    BlogPostB.find({}, {}).executed.should.be.false;

    // query, fields (array)
    BlogPostB.find({}, []).should.be.an.instanceof(Query);
//    BlogPostB.find({}, []).executed.should.be.false;

    // query, fields, options
    BlogPostB.find({}, {}, {}).should.be.an.instanceof(Query);
//    BlogPostB.find({}, {}, {}).executed.should.be.false;

    // query, fields (array), options
    BlogPostB.find({}, [], {}).should.be.an.instanceof(Query);
//    BlogPostB.find({}, [], {}).executed.should.be.false;

    db.close();
  },

  'test that findOne returns a Query': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);
    
    // query
    BlogPostB.findOne({}).should.be.an.instanceof(Query);
//    BlogPostB.findOne({}).executed.should.be.false;

    // query, fields
    BlogPostB.findOne({}, {}).should.be.an.instanceof(Query);
//    BlogPostB.findOne({}, {}).executed.should.be.false;

    // query, fields (array)
    BlogPostB.findOne({}, []).should.be.an.instanceof(Query);
//    BlogPostB.findOne({}, []).executed.should.be.false;

    // query, fields, options
    BlogPostB.findOne({}, {}, {}).should.be.an.instanceof(Query);
//    BlogPostB.findOne({}, {}, {}).executed.should.be.false;

    // query, fields (array), options
    BlogPostB.findOne({}, [], {}).should.be.an.instanceof(Query);
//    BlogPostB.findOne({}, [], {}).executed.should.be.false;

    db.close();
  },

  'test that a query is executed when a callback is passed': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , count = 5
//      , count = 10
      , q =  { _id: new DocumentObjectId }; // make sure the query is fast

    function fn () {
      --count || db.close();
    };
    
    // query
    BlogPostB.find(q, fn).should.be.an.instanceof(Query);
//    BlogPostB.find(q, fn).executed.should.be.true;

    // query, fields
    BlogPostB.find(q, {}, fn).should.be.an.instanceof(Query);
//    BlogPostB.find(q, {}, fn).executed.should.be.true;

    // query, fields (array)
    BlogPostB.find(q, [], fn).should.be.an.instanceof(Query);
//    BlogPostB.find(q, [], fn).executed.should.be.true;

    // query, fields, options
    BlogPostB.find(q, {}, {}, fn).should.be.an.instanceof(Query);
//    BlogPostB.find(q, {}, {}, fn).executed.should.be.true;

    // query, fields (array), options
    BlogPostB.find(q, [], {}, fn).should.be.an.instanceof(Query);
//    BlogPostB.find(q, [], {}, fn).executed.should.be.true;
  },

  'test that query is executed where a callback for findOne': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , count = 5
//      , count = 10
      , q =  { _id: new DocumentObjectId }; // make sure the query is fast

    function fn () {
      --count || db.close();
    };
    
    // query
    BlogPostB.findOne(q, fn).should.be.an.instanceof(Query);
//    BlogPostB.findOne(q, fn).executed.should.be.true;

    // query, fields
    BlogPostB.findOne(q, {}, fn).should.be.an.instanceof(Query);
//    BlogPostB.findOne(q, {}, fn).executed.should.be.true;

    // query, fields (array)
    BlogPostB.findOne(q, [], fn).should.be.an.instanceof(Query);
//    BlogPostB.findOne(q, [], fn).executed.should.be.true;

    // query, fields, options
    BlogPostB.findOne(q, {}, {}, fn).should.be.an.instanceof(Query);
//    BlogPostB.findOne(q, {}, {}, fn).executed.should.be.true;

    // query, fields (array), options
    BlogPostB.findOne(q, [], {}, fn).should.be.an.instanceof(Query);
//    BlogPostB.findOne(q, [], {}, fn).executed.should.be.true;
  },

  'test that count returns a Query': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    BlogPostB.count({}).should.be.an.instanceof(Query);
//    BlogPostB.count({}).executed.should.be.false;

    db.close();
  },

  'test that count Query executes when you pass a callback': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , count = 1;
//      , count = 2;

    function fn () {
      --count || db.close();
    };

    BlogPostB.count({}, fn).should.be.an.instanceof(Query);
//    BlogPostB.count({}, fn).executed.should.be.true;
  },

  'test that update returns a Query': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    BlogPostB.update({}, {}).should.be.an.instanceof(Query);
//    BlogPostB.update({}, {}).executed.should.be.false;

    BlogPostB.update({}, {}, {}).should.be.an.instanceof(Query);
//    BlogPostB.update({}, {}, {}).executed.should.be.false;

    db.close();
  },

  'test that update Query executes when you pass a callback': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , count = 2;
//      , count = 4;

    function fn () {
      --count || db.close();
    };

    BlogPostB.update({title: random()}, {}, fn).should.be.an.instanceof(Query);
//    BlogPostB.update({title: random()}, {}, fn).executed.should.be.true;

    BlogPostB.update({title: random()}, {}, {}, fn).should.be.an.instanceof(Query);
//    BlogPostB.update({title: random()}, {}, {}, fn).executed.should.be.true;
  },

  'test finding a document': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , title = 'Wooooot ' + random();

    var post = new BlogPostB();
    post.set('title', title);

    post.save(function (err) {
      should.strictEqual(err, null);

      BlogPostB.findOne({ title: title }, function (err, doc) {
        should.strictEqual(err, null);
        doc.get('title').should.eql(title);
        doc.isNew.should.be.false;

        db.close();
      });
    });
  },

  'test finding a document byId': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , title = 'Edwald ' + random();

    var post = new BlogPostB();
    post.set('title', title);

    post.save(function (err) {
      should.strictEqual(err, null);

      BlogPostB.findById(post.get('_id'), function (err, doc) {
        should.strictEqual(err, null);
        doc.should.be.an.instanceof(BlogPostB);
        doc.get('title').should.eql(title);

        db.close();
      });
    });
  },

  'test finding documents': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , title = 'Wooooot ' + random();

    var post = new BlogPostB();
    post.set('title', title);

    post.save(function (err) {
      should.strictEqual(err, null);

      var post = new BlogPostB();
      post.set('title', title);

      post.save(function (err) {
        should.strictEqual(err, null);

        BlogPostB.find({ title: title }, function (err, docs) {
          should.strictEqual(err, null);
          docs.should.have.length(2);

          docs[0].get('title').should.eql(title);
          docs[0].isNew.should.be.false;

          docs[1].get('title').should.eql(title);
          docs[1].isNew.should.be.false;

          db.close();
        });
      });
    });
  },

  'test finding documents where an array that contains one specific member': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);
    BlogPostB.create({numbers: [100, 101, 102]}, function (err, created) {
      should.strictEqual(err, null);
      BlogPostB.find({numbers: 100}, function (err, found) {
        should.strictEqual(err, null);
        found.should.have.length(1);
        found[0]._id.should.eql(created._id);
        db.close();
      });
    });
  },

  'test counting documents': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , title = 'Wooooot ' + random();

    var post = new BlogPostB();
    post.set('title', title);

    post.save(function (err) {
      should.strictEqual(err, null);

      var post = new BlogPostB();
      post.set('title', title);

      post.save(function (err) {
        should.strictEqual(err, null);

        BlogPostB.count({ title: title }, function (err, count) {
          should.strictEqual(err, null);

          count.should.be.a('number');
          count.should.eql(2);

          db.close();
        });
      });
    });
  },

  'test query casting': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , title = 'Loki ' + random();

    var post = new BlogPostB()
      , id = DocumentObjectId.toString(post.get('_id'));

    post.set('title', title);

    post.save(function (err) {
      should.strictEqual(err, null);

      BlogPostB.findOne({ _id: id }, function (err, doc) {
        should.strictEqual(err, null);

        doc.get('title').should.equal(title);
        db.close();
      });
    });
  },

  'test a query that includes a casting error': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    BlogPostB.find({ date: 'invalid date' }, function (err) {
      err.should.be.an.instanceof(Error);
      err.should.be.an.instanceof(CastError);
      db.close();
    });
  },

  'test findOne queries that require casting for $modifiers': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , post = new BlogPostB({
          meta: {
            visitors: -10
          }
        });

    post.save(function (err) {
      should.strictEqual(err, null);

      BlogPostB.findOne({ 'meta.visitors': { $gt: '-20', $lt: -1 } }, 
      function (err, found) {
        found.get('meta.visitors')
             .valueOf().should.equal(post.get('meta.visitors').valueOf());
        found.get('_id').should.eql(post.get('_id'));
        db.close();
      });
    });
  },

  'test find queries that require casting for $modifiers': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , post = new BlogPostB({
          meta: {
            visitors: -75
          }
        });

    post.save(function (err) {
      should.strictEqual(err, null);

      BlogPostB.find({ 'meta.visitors': { $gt: '-100', $lt: -50 } },
      function (err, found) {
        should.strictEqual(err, null);

        found.should.have.length(1);
        found[0].get('_id').should.eql(post.get('_id'));
        found[0].get('meta.visitors').valueOf()
                .should.equal(post.get('meta.visitors').valueOf());
        db.close();
      });
    });
  },

  // GH-199
  'test find queries where $in cast the values wherein the array': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    var post = new BlogPostB()
      , id = DocumentObjectId.toString(post._id);

    post.save(function (err) {
      should.strictEqual(err, null);

      BlogPostB.findOne({ _id: { $in: [id] } }, function (err, doc) {
        should.strictEqual(err, null);

        DocumentObjectId.toString(doc._id).should.eql(id);
        db.close();
      });
    });
  },

  // GH-232
  'test find queries where $nin cast the values wherein the array': function () {
    var db = start()
      , NinSchema = new Schema({
          num: Number
        });
    mongoose.model('Nin', NinSchema);
    var Nin = db.model('Nin', 'nins_' + random());
    Nin.create({ num: 1 }, function (err, one) {
      should.strictEqual(err, null);
      Nin.create({ num: 2 }, function (err, two) {
        should.strictEqual(err, null);
        Nin.create({num: 3}, function (err, three) {
          should.strictEqual(err, null);
          Nin.find({ num: {$nin: [2]}}, function (err, found) {
            should.strictEqual(err, null);
            found.should.have.length(2);
            db.close();
          });
        });
      });
    });
  },

  'test for findById where partial initialization': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , queries = 5;

    var post = new BlogPostB();

    post.title = 'hahaha';
    post.slug = 'woot';

    post.save(function (err) {
      should.strictEqual(err, null);

      BlogPostB.findById(post.get('_id'), function (err, doc) {
        should.strictEqual(err, null);
        doc.isInit('title').should.be.true;
        doc.isInit('slug').should.be.true;
        doc.isInit('date').should.be.false;
        --queries || db.close();
      });

      BlogPostB.findById(post.get('_id'), ['title'], function (err, doc) {
        should.strictEqual(err, null);
        doc.isInit('title').should.be.true;
        doc.isInit('slug').should.be.false;
        doc.isInit('date').should.be.false;
        --queries || db.close();
      });

      BlogPostB.findById(post.get('_id'), { slug: 0 }, function (err, doc) {
        should.strictEqual(err, null);
        doc.isInit('title').should.be.true;
        doc.isInit('slug').should.be.false;
        doc.isInit('date').should.be.false;
        --queries || db.close();
      });

      BlogPostB.findById(post.get('_id'), ['title'], function (err, doc) {
        should.strictEqual(err, null);
        doc.isInit('title').should.be.true;
        doc.isInit('slug').should.be.false;
        doc.isInit('date').should.be.false;
        --queries || db.close();
      });

      BlogPostB.findById(post.get('_id'), ['slug'], function (err, doc) {
        should.strictEqual(err, null);
        doc.isInit('title').should.be.false;
        doc.isInit('slug').should.be.true;
        doc.isInit('date').should.be.false;
        --queries || db.close();
      });
    });
  },

  'test find where subset of fields, excluding _id': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);
    BlogPostB.create({title: 'subset 1'}, function (err, created) {
      should.strictEqual(err, null);
      BlogPostB.findOne({title: 'subset 1'}, {title: 1, _id: 0}, function (err, found) {
        should.strictEqual(err, null);
        found._id.should.be.null;
        found.title.should.equal('subset 1');
        db.close();
      });
    });
  },

  'test for find where partial initialization': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , queries = 5;

    var post = new BlogPostB();

    post.title = 'hahaha';
    post.slug = 'woot';

    post.save(function (err) {
      should.strictEqual(err, null);

      BlogPostB.find({ _id: post.get('_id') }, function (err, docs) {
        should.strictEqual(err, null);
        docs[0].isInit('title').should.be.true;
        docs[0].isInit('slug').should.be.true;
        docs[0].isInit('date').should.be.false;
        --queries || db.close();
      });

      BlogPostB.find({ _id: post.get('_id') }, ['title'], function (err, docs) {
        should.strictEqual(err, null);
        docs[0].isInit('title').should.be.true;
        docs[0].isInit('slug').should.be.false;
        docs[0].isInit('date').should.be.false;
        --queries || db.close();
      });

      BlogPostB.find({ _id: post.get('_id') }, { slug: 0 }, function (err, docs) {
        should.strictEqual(err, null);
        docs[0].isInit('title').should.be.true;
        docs[0].isInit('slug').should.be.false;
        docs[0].isInit('date').should.be.false;
        --queries || db.close();
      });

      BlogPostB.find({ _id: post.get('_id') }, ['title'], function (err, docs) {
        should.strictEqual(err, null);
        docs[0].isInit('title').should.be.true;
        docs[0].isInit('slug').should.be.false;
        docs[0].isInit('date').should.be.false;
        --queries || db.close();
      });

      BlogPostB.find({ _id: post.get('_id') }, ['slug'], function (err, docs) {
        should.strictEqual(err, null);
        docs[0].isInit('title').should.be.false;
        docs[0].isInit('slug').should.be.true;
        docs[0].isInit('date').should.be.false;
        --queries || db.close();
      });
    });
  },

  // GH-204
  'test query casting when finding by Date': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    var post = new BlogPostB();

    post.meta.date = new Date();

    post.save(function (err) {
      should.strictEqual(err, null);

      BlogPostB.findOne({ _id: post._id, 'meta.date': { $lte: Date.now() } },
      function (err, doc) {
        should.strictEqual(err, null);

        DocumentObjectId.toString(doc._id).should.eql(DocumentObjectId.toString(post._id));
        db.close();
      });
    });
  },

  // GH-220
  'test querying if an array contains at least a certain single member': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

      var post = new BlogPostB();

      post.tags.push('cat');

      post.save( function (err) {
        should.strictEqual(err, null);

        BlogPostB.findOne({tags: 'cat'}, function (err, doc) {
          should.strictEqual(err, null);

          doc._id.should.eql(post._id);
          db.close();
        });
      });
  },

  'test querying if an array contains one of multiple members $in a set': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

      var post = new BlogPostB();

      post.tags.push('football');

      post.save( function (err) {
        should.strictEqual(err, null);

        BlogPostB.findOne({tags: {$in: ['football', 'baseball']}}, function (err, doc) {
          should.strictEqual(err, null);

          doc._id.should.eql(post._id);
          db.close();
        });
      });
  },

  'test querying via $which where a string': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    BlogPostB.create({ title: 'Steve Jobs', author: 'Steve Jobs'}, function (err, created) {
      should.strictEqual(err, null);

      BlogPostB.findOne({ $where: "this.title && this.title === this.author" }, function (err, found) {
        should.strictEqual(err, null);

        found._id.should.eql(created._id);
        db.close();
      });
    });
  },

  'test querying via $which where a function': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    BlogPostB.create({ author: 'Atari', slug: 'Atari'}, function (err, created) {
      should.strictEqual(err, null);

      BlogPostB.findOne({ $where: function () {
        return (this.author && this.slug && this.author === this.slug);
      } }, function (err, found) {
        should.strictEqual(err, null);

        found._id.should.eql(created._id);
        db.close();
      });
    });
  },

  // TODO Won't pass until we fix materialization/raw data assymetry
  'test find where $exists': function () {
    var db = start()
      , ExistsSchema = new Schema({
            a: Number
          , b: String
        });
    mongoose.model('Exists', ExistsSchema);
    var Exists = db.model('Exists', 'exists_' + random());
    Exists.create({ a: 1}, function (err, aExisting) {
      should.strictEqual(err, null);
      Exists.create({b: 'hi'}, function (err, bExisting) {
        should.strictEqual(err, null);
        Exists.find({b: {$exists: true}}, function (err, docs) {
          should.strictEqual(err, null);
          db.close();
          docs.should.have.length(1);
        });
      });
    });
  },

  'test finding based on nested fields': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , post = new BlogPostB({
          meta: {
            visitors: 5678
          }
        });

    post.save(function (err) {
      should.strictEqual(err, null);

      BlogPostB.findOne({ 'meta.visitors': 5678 }, function (err, found) {
        should.strictEqual(err, null);
        found.get('meta.visitors')
          .valueOf().should.equal(post.get('meta.visitors').valueOf());
        found.get('_id').should.eql(post.get('_id'));
        db.close();
      });
    });
  },

  // GH-242
  'test finding based on embedded document fields': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    BlogPostB.create({comments: [{title: 'i should be queryable'}]}, function (err, created) {
      should.strictEqual(err, null);
      BlogPostB.findOne({'comments.title': 'i should be queryable'}, function (err, found) {
        should.strictEqual(err, null);
        found._id.should.eql(created._id);
        db.close();
      });
    });
  },

  'test finding where $elemMatch': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , dateAnchor = +new Date;

    BlogPostB.create({comments: [{title: 'elemMatch', date: dateAnchor + 5}]}, function (err, createdAfter) {
      should.strictEqual(err, null);
      BlogPostB.create({comments: [{title: 'elemMatch', date: dateAnchor - 5}]}, function (err, createdBefore) {
        should.strictEqual(err, null);
        BlogPostB.find({'comments': {'$elemMatch': {title: 'elemMatch', date: {$gt: dateAnchor}}}}, 
          function (err, found) {
            should.strictEqual(err, null);
            found.should.have.length(1);
            found[0]._id.should.eql(createdAfter._id);
            db.close();
          }
        );
      });
    });
  },

  'test finding where $mod': function () {
    var db = start()
      , Mod = db.model('Mod', 'mods_' + random());
    Mod.create({num: 1}, function (err, one) {
      should.strictEqual(err, null);
      Mod.create({num: 2}, function (err, two) {
        should.strictEqual(err, null);
        Mod.find({num: {$mod: [2, 1]}}, function (err, found) {
          should.strictEqual(err, null);
          found.should.have.length(1);
          found[0]._id.should.eql(one._id);
          db.close();
        });
      });
    });
  },

  'test finding where $not': function () {
    var db = start()
      , Mod = db.model('Mod', 'mods_' + random());
    Mod.create({num: 1}, function (err, one) {
      should.strictEqual(err, null);
      Mod.create({num: 2}, function (err, two) {
        should.strictEqual(err, null);
        Mod.find({num: {$not: {$mod: [2, 1]}}}, function (err, found) {
          should.strictEqual(err, null);
          found.should.have.length(1);
          found[0]._id.should.eql(two._id);
          db.close();
        });
      });
    });
  },

  'test finding where $or': function () {
    var db = start()
      , Mod = db.model('Mod', 'mods_' + random());
    Mod.create({num: 1}, function (err, one) {
      should.strictEqual(err, null);
      Mod.create({num: 2}, function (err, two) {
        should.strictEqual(err, null);
        Mod.create({num: 3}, function (err, three) {
          should.strictEqual(err, null);
          Mod.find({$or: [{num: 1}, {num: 2}]}, function (err, found) {
            should.strictEqual(err, null);
            found.should.have.length(2);
            found[0]._id.should.eql(one._id);
            found[1]._id.should.eql(two._id);
            db.close();
          });
        });
      });
    });
  },

  'test finding where $ne': function () {
    var db = start()
      , Mod = db.model('Mod', 'mods_' + random());
    Mod.create({num: 1}, function (err, one) {
      should.strictEqual(err, null);
      Mod.create({num: 2}, function (err, two) {
        should.strictEqual(err, null);
        Mod.create({num: 3}, function (err, three) {
          should.strictEqual(err, null);
          Mod.find({num: {$ne: 1}}, function (err, found) {
            should.strictEqual(err, null);
            found.should.have.length(2);
            found[0]._id.should.eql(two._id);
            found[1]._id.should.eql(three._id);
            db.close();
          });
        });
      });
    });
  },

  'test finding null matches null and undefined': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection + random());

    BlogPostB.create({title: 'A', author: null}, function (err, createdA) {
      should.strictEqual(err, null);
      BlogPostB.create({title: 'B'}, function (err, createdB) {
        should.strictEqual(err, null);
        BlogPostB.find({author: null}, function (err, found) {
          should.strictEqual(err, null);
          found.should.have.length(2);
          db.close();
        });
      });
    });
  },

  'test finding STRICT null matches': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection + random());

    BlogPostB.create({title: 'A', author: null}, function (err, createdA) {
      should.strictEqual(err, null);
      BlogPostB.create({title: 'B'}, function (err, createdB) {
        should.strictEqual(err, null);
        BlogPostB.find({author: {$in: [null], $exists: true}}, function (err, found) {
          should.strictEqual(err, null);
          found.should.have.length(1);
          found[0]._id.should.eql(createdA._id);
          db.close();
        });
      });
    });
  },

  'test finding strings via regular expressions': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    BlogPostB.create({title: 'Next to Normal'}, function (err, created) {
      should.strictEqual(err, null);
      BlogPostB.findOne({title: /^Next/}, function (err, found) {
        should.strictEqual(err, null);
        found._id.should.eql(created._id);
        db.close();
      });
    });
  },

  'test finding a document whose arrays contain at least $all values': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    BlogPostB.create({numbers: [-1,-2,-3,-4]}, function (err, whereoutZero) {
      should.strictEqual(err, null);
      BlogPostB.create({numbers: [0,-1,-2,-3,-4]}, function (err, whereZero) {
        should.strictEqual(err, null);
        BlogPostB.find({numbers: {$all: [-1, -2, -3, -4]}}, function (err, found) {
          should.strictEqual(err, null);
          found.should.have.length(2);
          BlogPostB.find({numbers: {$all: [0, -1]}}, function (err, found) {
            should.strictEqual(err, null);
            found.should.have.length(1);
            db.close();
          });
        });
      });
    });
  },

  'test finding documents where an array of a certain $size': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    BlogPostB.create({numbers: [1,2,3,4,5,6,7,8,9,10]}, function (err, whereoutZero) {
      should.strictEqual(err, null);
      BlogPostB.create({numbers: [11,12,13,14,15,16,17,18,19,20]}, function (err, whereZero) {
        should.strictEqual(err, null);
        BlogPostB.create({numbers: [1,2,3,4,5,6,7,8,9,10,11]}, function (err, found) {
          BlogPostB.find({numbers: {$size: 10}}, function (err, found) {
            should.strictEqual(err, null);
            found.should.have.length(2);
            BlogPostB.find({numbers: {$size: 11}}, function (err, found) {
              should.strictEqual(err, null);
              found.should.have.length(1);
              db.close();
            });
          });
        });
      });
    });
  },

  'test finding documents where an array where the $slice operator': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    BlogPostB.create({numbers: [500,600,700,800]}, function (err, created) {
      should.strictEqual(err, null);
      BlogPostB.findById(created._id, {numbers: {$slice: 2}}, function (err, found) {
        should.strictEqual(err, null);
        found._id.should.eql(created._id);
        found.numbers.should.have.length(2);
        found.numbers[0].should.equal(500);
        found.numbers[1].should.equal(600);
        BlogPostB.findById(created._id, {numbers: {$slice: -2}}, function (err, found) {
          should.strictEqual(err, null);
          found._id.should.eql(created._id);
          found.numbers.should.have.length(2);
          found.numbers[0].should.equal(700);
          found.numbers[1].should.equal(800);
          BlogPostB.findById(created._id, {numbers: {$slice: [1, 2]}}, function (err, found) {
            should.strictEqual(err, null);
            found._id.should.eql(created._id);
            found.numbers.should.have.length(2);
            found.numbers[0].should.equal(600);
            found.numbers[1].should.equal(700);
            db.close();
          });
        });
      });
    });
  },

  'test limits': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    BlogPostB.create({title: 'first limit'}, function (err, first) {
      should.strictEqual(err, null);
      BlogPostB.create({title: 'second limit'}, function (err, second) {
        should.strictEqual(err, null);
        BlogPostB.create({title: 'third limit'}, function (err, third) {
          should.strictEqual(err, null);
          BlogPostB.find({title: /limit$/}).limit(2).find( function (err, found) {
            should.strictEqual(err, null);
            found.should.have.length(2);
            found[0]._id.should.eql(first._id);
            found[1]._id.should.eql(second._id);
            db.close();
          });
        });
      });
    });
  },

  'test skips': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    BlogPostB.create({title: 'first skip'}, function (err, first) {
      should.strictEqual(err, null);
      BlogPostB.create({title: 'second skip'}, function (err, second) {
        should.strictEqual(err, null);
        BlogPostB.create({title: 'third skip'}, function (err, third) {
          should.strictEqual(err, null);
          BlogPostB.find({title: /skip$/}).skip(1).limit(2).find( function (err, found) {
            should.strictEqual(err, null);
            found.should.have.length(2);
            found[0]._id.should.eql(second._id);
            found[1]._id.should.eql(third._id);
            db.close();
          });
        });
      });
    });
  },

  'test sorts': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    BlogPostB.create({meta: {visitors: 100}}, function (err, least) {
      should.strictEqual(err, null);
      BlogPostB.create({meta: {visitors: 300}}, function (err, largest) {
        should.strictEqual(err, null);
        BlogPostB.create({meta: {visitors: 200}}, function (err, middle) {
          should.strictEqual(err, null);
          BlogPostB
            .where('meta.visitors').gt(99).lt(301)
            .sort('meta.visitors', -1)
            .find( function (err, found) {
              should.strictEqual(err, null);
              found.should.have.length(3);
              found[0]._id.should.eql(largest._id);
              found[1]._id.should.eql(middle._id);
              found[2]._id.should.eql(least._id);
              db.close();
            });
        });
      });
    });
  },

  'test backwards compatibility with previously existing null values in db': function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , post = new BlogPostB();

    post.collection.insert({ meta: { visitors: 9898, a: null } }, {}, function (err, b) {
      should.strictEqual(err, null);

      BlogPostB.findOne({_id: b[0]._id}, function (err, found) {
        should.strictEqual(err, null);
        found.get('meta.visitors').valueOf().should.eql(9898);
        db.close();
      })
    })
  }

  // IDIOMATIC SYNTAX TESTS
};
