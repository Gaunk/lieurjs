export function validate(body, rules) {
    const errors = [];
    for (const field in rules) {
        const rule = rules[field];
        if (rule.required && (body[field] === undefined || body[field] === null)) {
            errors.push(`${field} is required`);
        }
        if (rule.type && typeof body[field] !== rule.type) {
            errors.push(`${field} must be a ${rule.type}`);
        }
    }
    return errors;
}
