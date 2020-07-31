module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            username: {type: String, index: {unique: true}},
            password: String,
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Auth = mongoose.model("auth", schema);
    return Auth;
};