module.exports = {
    /**
     * Default: false
     * Pass true to only emit binlog events that occur after ZongJi's instantiation.
     * Must be used in start() method for effect.
     */
    startAtEnd: false,
    /**
     * Databases and tables to include (Only for row events).
     * Use database names as the key and pass an array of table names or true (for the entire database)
     * Example: { 'my_database': ['allow_table', 'another_table'], 'another_db': true }
     */
    includeSchema: {
        cd:true,
        cdc:true
    },
    /**
     * Object describing which databases and tables to exclude (Same format as includeSchema)
     * Example: { 'other_db': ['disallowed_table'], 'ex_db': true }
     */
    excludeSchema: {
        mysql: true,
        sys:true
    }
}