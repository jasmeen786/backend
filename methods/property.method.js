const Property = require("../models/Property");

exports.addPropertyMethod = async (data) => {
  const result = await Property.create(data);
  if (!result) {
    throw new Error("Failed to create property");
  }
  return result;
};

exports.updatePropertyMethod = async (id, data) => {
  const result = await Property.findOneAndUpdate(
    {
      id: id,
    },
    {
      ...data,
    },
    {
      new: true,
    }
  );

  if (!result) {
    throw new Error("Failed to update property");
  }

  return result;
};

exports.getAllPropertyMethod = async () => {
  const result = await Property.findMany({});
  return result;
};

exports.getPropertyByOwnerMethod = async (ownerID) => {
  const result = await Property.findMany({
    ownerID: ownerID,
  });
  return result;
};
exports.searchPropertyByNameController = async (propertyName) => {
  const result = await Property.findMany({
    propertyName: propertyName.trim(),
  });
  return result;
};

exports.deletePropertyMethod = async (id) => {
  const result = await Property.findByIdAndDelete(id);

  if (!result) {
    throw new Error("Failed to delete property");
  }

  return result;
};
