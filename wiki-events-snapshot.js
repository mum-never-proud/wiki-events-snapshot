import uid from 'uniqid';

/**
 * a very basic dom snapshot methods
 * which doesnt cover edge cases and  will be improved in upcoming versions
*/

function isAbsoluteURL(url) {
  return /^(?:[a-z]+:)?\/\//.test(url);
}

function toAbsoluteURL(base, url) {
  if (typeof url === 'string') {
    if (isAbsoluteURL(url)) {
      return url;
    }

    const baseFragements = base.split('/');
    const urlFragments = url.split('/');

    baseFragements.pop();

    urlFragments.forEach((urlFragment) => {
      if (urlFragment === '..') {
        baseFragements.pop();
      } else if (urlFragment === '.');
      else {
        baseFragements.push(urlFragment);
      }
    });

    return baseFragements.join('/');
  }

  return null;
}

function attrContainsURL(attr) {
  return ['href', 'src'].includes(attr);
}

function serializeAttributes(attrs = []) {
  return Array.from(attrs)
    .map((attr) => ({
      name: attr.name === 'class' ? 'className' : attr.name,
      value: attrContainsURL(attr.name)
        ? toAbsoluteURL(window.location.href, attr.value)
        : attr.value,
    }));
}

function serializeChildNodes(childNodes = [], cb) {
  return Array.from(childNodes)
    .map((childNode) => cb(childNode));
}

export function createSnapshot(node = {}, recursive = true) {
  const id = node.__we_id__ || uid();

  if (!node.__we_id__) {
    // eslint-disable-next-line no-param-reassign
    node.__we_id__ = id;
  }

  switch (node.nodeType) {
    case Node.COMMENT_NODE:
      return {
        __we_id__: id,
        textContent: node.textContent,
        type: Node.COMMENT_NODE,
      };
    case Node.DOCUMENT_NODE:
      return {
        __we_id__: id,
        childNodes: recursive ? serializeChildNodes(node.childNodes, createSnapshot) : [],
        type: node.nodeType,
      };
    case Node.DOCUMENT_TYPE_NODE:
      return {
        __we_id__: id,
        name: node.name,
        publicId: node.publicId,
        systemId: node.systemId,
        type: node.nodeType,
      };
    case Node.ELEMENT_NODE:
      return {
        __we_id__: id,
        attrs: serializeAttributes(node.attributes),
        childNodes: recursive ? serializeChildNodes(node.childNodes, createSnapshot) : [],
        tagName: node.tagName,
        type: node.nodeType,
      };
    case Node.TEXT_NODE:
      return {
        __we_id__: id,
        textContent: node.textContent,
        type: node.nodeType,
      };
    default:
      return {};
  }
}

export function rebuildSnapshot(snapshot = {}, withId = false) {
  switch (snapshot.type) {
    case Node.COMMENT_NODE:
      return document.createComment(snapshot.textContent);
    case Node.DOCUMENT_NODE: {
      const ele = document.implementation.createDocument(null, '', null);

      snapshot.childNodes
        .forEach((childNode) => ele.appendChild(rebuildSnapshot(childNode, withId)));

      return ele;
    }
    case Node.DOCUMENT_TYPE_NODE:
      return document.implementation.createDocumentType(
        snapshot.name, snapshot.systemId, snapshot.publicId,
      );
    case Node.ELEMENT_NODE: {
      const ele = document.createElement(snapshot.tagName);

      snapshot.attrs
        .forEach(({ name, value }) => ele.setAttribute(name === 'className' ? 'class' : name, value));
      snapshot.childNodes
        .forEach((childNode) => ele.appendChild(rebuildSnapshot(childNode, withId)));

      if (withId) {
        ele.setAttribute('data-we-id', snapshot.__we_id__);
      }

      return ele;
    }
    case Node.TEXT_NODE:
      return document.createTextNode(snapshot.textContent);
    default:
      return null;
  }
}
