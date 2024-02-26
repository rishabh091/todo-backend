const validate = (schema, body, res, next) => {
    const { error } = schema.validate(body);
    if (error) {
        return res.status(400).json({ error });
    }
    return next();
};

module.exports = validate;