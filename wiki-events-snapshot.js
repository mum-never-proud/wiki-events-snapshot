import uid from 'uniqid';

/**
 * a very basic dom snapshot functionalities
 * it doesnt cover edge cases
 * definitely needs improvement which will be improved in later versions
*/

export function createSnapshot(node = {}) {
  if (node.nodeType) {
    const snapshot = {};
    snapshot.__we_id__ = uid();
    snapshot.attrs = [];
    snapshot.childNodes = Array.from(node.childNodes || [])
      .map(childNode => createSnapshot(childNode));
    snapshot.tagName = node.tagName;
    snapshot.type = node.nodeType;

    Array.from(node.attributes || [])
      .forEach(attr => snapshot.attrs.push({
        name: attr.name === 'class' ? 'className' : attr.name,
        value: attr.value
      }));

    if (node.nodeType === Node.TEXT_NODE) {
      snapshot.textContent = node.textContent;
    }

    node.__we_id__ = snapshot.__we_id__;

    return snapshot;
  }

  return {};
}

export function rebuildSnapshot(snapshot = {}) {
  switch (snapshot.type) {
    case Node.ELEMENT_NODE:
      const ele = document.createElement(snapshot.tagName);

      if (snapshot.attrs) {
        snapshot.attrs
          .forEach(({ name, value }) => ele.setAttribute(name === 'className' ? 'class' : name, value));
      }

      snapshot.childNodes
        .forEach(childNode => ele.appendChild(rebuildSnapshot(childNode)));

        return ele;
    case Node.TEXT_NODE:
      return document.createTextNode(snapshot.textContent);
    default:
      return;
  }
}
