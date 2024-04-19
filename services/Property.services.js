const Property = require("../models/Property");
const propertyMethod = require("../methods/property.method");

exports.addPropertyService = async (data) => {
  try {
    const result = await propertyMethod.addPropertyMethod(data);
    return result;
  } catch (error) {
    console.log("🚀 ~ exports.addPropertyService= ~ error:", error);
    throw new Error("Failed to create property");
  }
};

exports.updatePropertyService = async (id, data) => {
  try {
    const result = await Property.findByIdAndUpdate(id, data, { new: true });
    if (!result) {
      throw new Error("Failed to update property");
    }
    return result;
  } catch (error) {
    throw new Error("Failed to update property");
  }
};

exports.getAllPropertiesService = async () => {
  try {
    const result = await Property.findMany({});
    return result;
  } catch (error) {
    throw new Error("Failed to get all properties");
  }
};

exports.getPropertyByOwnerService = async (ownerID) => {
  try {
    const result = await Property.find({ ownerID: ownerID });
    return result;
  } catch (error) {
    console.log("🚀 ~ exports.getPropertyByOwnerService= ~ error:", error);
    throw new Error("Failed to get properties by owner");
  }
};

exports.searchPropertyByNameService = async (propertyName) => {
  try {
    const result = await Property.findMany({
      propertyName: propertyName.trim(),
    });
    return result;
  } catch (error) {
    throw new Error("Failed to search properties");
  }
};

exports.deletePropertyService = async (id) => {
  try {
    const result = await Property.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Failed to delete property");
    }
    return { message: "Property deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete property");
  }
};
