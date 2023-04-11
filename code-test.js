function resolveXYZArray(
  checkObject: StringObject,
  unpredictable: UnpredictableObject
): Array<StringObject> | null {
  //declare variable to store array of objects with key xyz
  let xyzArray: StringObject[] | undefined;

  // define function that go through unpredictable object and assign array to xyzArray if found.
  const findXYZArray = (obj: any) => {
    // check if the object is an array
    if (Array.isArray(obj)) {
      //if an array, loop through items in the array and call the findXYZArray function on it
      obj.forEach((item) => findXYZArray(item));
    } else if (typeof obj === "object") {
      //if an object, loop through each key-value pair and call the findXYZArray function on the value if the key is not xyz
      Object.entries(obj).forEach(([key, value]) => {
        if (key === "xyz") {
          xyzArray = value;
        } else {
          findXYZArray(value);
        }
      });
    }
  };

  // call the findXYZArray function on the unpredictabl param to find array of objects with the key xyz
  findXYZArray(unpredictable);

  //If not xyzArray, return null
  if (!xyzArray) {
    return null;
  }

  // If xyzArray, filter array to only include objects that have all the key-value pairs of the checkObject param
  return xyzArray.filter((item) => {
    //use the Object.entrie method to iterate over the key-value pairs of both the checkObject param and each object in the xyzArray
    //use the every method to check that every key-value pair in checkObject is present in each object in xyzArray
    return Object.entries(checkObject).every(([key, value]) => {
      return item.hasOwnProperty(key) && item[key] === value;
    });
  });
}
