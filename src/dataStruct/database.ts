export default mem => {
	mem.alasql.databasenum = 0;
	mem.alasql.databases = {};

	class Database {
		databaseid: string;
		alasql: any;
		dbversion = 0;
		counter = 0;

		tables: {[key: string]: any} = {};
		views: {[key: string]: any} = {};
		triggers: {[key: string]: any} = {};
		indices: {[key: string]: any} = {};
		objects: {[key: string]: any} = {};

		sqlCache: {[key: string]: any} = {};
		sqlCacheSize = 0;

		constructor(databaseid: string, alasql: any) {
			this.alasql = alasql;
			this.databaseid = databaseid;

			return this;
		}

		/**
		  Reset SQL statements cache
	   */
		resetSqlCache() {
			this.sqlCache = {}; // Cache for compiled SQL statements
			this.sqlCacheSize = 0;
		}

		// Main SQL function
		/**
			Run SQL statement on database
			@param sql — SQL statement
			@param object — params Parameters
			@param cb — callback
		*/
		exec(sql: string, params?, cb?) {
			return this.alasql.dexec(this.databaseid, sql, params, cb);
		}

		autoval(tablename: string, colname?, getNext?) {
			return this.alasql.autoval(tablename, colname, getNext, this.databaseid);
		}
	}

	mem.alasql.newDatabase = (dbName?, useNewDatabase = true) => {
		if (!dbName) {
			dbName = 'db' + mem.alasql.databasenum++; // Unique name
		}

		let db = new Database(dbName, mem.alasql);
		mem.alasql.databases[db.databaseid] = db;
		if (useNewDatabase) {
			mem.alasql.use('alasql');
		}
	};

	//mem.alasql.Database = Database;
};

// 	// Main Database class

// 	/**
//     @class Database
//  	*/

// 	 const Database = (databaseid) => {
// 		var self = this;
// 		//		self = function(a){console.log('OK',a);}
// 		//		self.prototype = this;

// 		if (self === alasql) {
// 			if (databaseid) {
// 				//			if(alasql.databases[databaseid]) {
// 				self = alasql.databases[databaseid];
// 				//			} else {
// 				alasql.databases[databaseid] = self;
// 				//			}
// 				if (!self) {
// 					throw new Error('Database "' + databaseid + '" not found');
// 				}
// 			} else {
// 				// Create new database (or get alasql?)
// 				self = alasql.databases.alasql;
// 				// For SQL Server examples, USE tempdb
// 				if (alasql.options.tsql) {
// 					alasql.databases.tempdb = alasql.databases.alasql;
// 				}
// 				//			self = new Database(databaseid); // to call without new
// 			}
// 		}
// 		if (!databaseid) {
// 			databaseid = 'db' + alasql.databasenum++; // Unique name
// 		}

// 		// Step 1
// 		self.databaseid = databaseid;
// 		alasql.databases[databaseid] = self;
// 		self.dbversion = 0;

// 		//Steps 2-5
// 		self.tables = {};
// 		self.views = {};
// 		self.triggers = {};
// 		self.indices = {};

// 		// Step 6: Objects storage
// 		self.objects = {};
// 		self.counter = 0;

// 		self.resetSqlCache();
// 		return self;
// 	};

// 	/**
//     Reset SQL statements cache
//  */

// 	Database.prototype.resetSqlCache = function() {
// 		this.sqlCache = {}; // Cache for compiled SQL statements
// 		this.sqlCacheSize = 0;
// 	};

// 	// Main SQL function

// 	/**
//     Run SQL statement on database
//     @param {string} sql SQL statement
//     @param [object] params Parameters
//     @param {function} cb callback
//  */

// 	Database.prototype.exec = function(sql, params, cb) {
// 		return alasql.dexec(this.databaseid, sql, params, cb);
// 	};

// 	Database.prototype.autoval = function(tablename, colname, getNext) {
// 		return alasql.autoval(tablename, colname, getNext, this.databaseid);
// 	};

// 	/*/*
// // 	// Compile
// // 	var statement = this.compile(sql);
// // 	// Run
// // 	if(statement) {
// // 		var data = statement(params, cb);
// // 		return data;
// // 	}
// // 	return;
// // };

// // // Async version of exec

// // Database.prototype.aexec = function(sql, params) {
// // 	var self = this;
// // 	return new Promise(function(resolve, reject){
// // 		alasql.dexec(this.databaseid,sql,params,resolve);
// // 	});
// // };
// */

// 	// Aliases like MS SQL
// 	/*/*
// Database.prototype.query = Database.prototype.exec;
// Database.prototype.run = Database.prototype.exec;
// Database.prototype.queryArray = function(sql, params, cb) {
// 	return flatArray(this.exec(sql, params, cb));
// }

// Database.prototype.queryArrayOfArrays = function(sql, params, cb) {
// 	return arrayOfArrays(this.exec(sql, params, cb));
// }

// Database.prototype.querySingle = function(sql, params, cb) {
// 	return this.exec(sql, params, cb)[0];
// }
// Database.prototype.queryValue = function(sql, params, cb) {
// 	var res = this.querySingle(sql, params, cb);
// 	return res[Object.keys(res)[0]];
// }

// Database.prototype.value  = Database.prototype.queryValue;
// Database.prototype.row    = Database.prototype.querySingle;
// Database.prototype.array  = Database.prototype.queryArray;
// Database.prototype.matrix = Database.prototype.queryArrayOfArrays;

// // Compile statements
// Database.prototype.compile = function(sql, kind) {
// 	return alasql.compile(sql, kind, databaseid);
// };

// */

// 	/*/*
// // 	var self = this;
// // 	var hh = hash(sql);

// // 	// Check cache with hash of SQL statement
// // 	var statement = this.sqlcache[hh];
// // 	if(!statement) {

// // 		// If not fount, then compile it
// // 		var ast = alasql.parse(sql);
// // 		// Save to cache

// // 		statement = this.sqlcache[hh]= ast.compile(self);

// // 		// Memory leak prevention
// // 		this.sqlcachesize++;
// // 		if(this.sqlcachesize > alasql.MAXSQLCACHESIZE) {
// // 			this.resetSqlCache();
// // 		}
// // 	};
// // 	return statement;
// // }

// // SQL.js compatibility method
// //Database.prototype.prepare = Database.prototype.compile;

// // Added for compatibility with WebSQL
// */