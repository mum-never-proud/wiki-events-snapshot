import { createSnapshot, rebuildSnapshot } from '../wiki-events-snapshot.js';

describe('wiki events snapshot test', function() {
  document.body.classList.add('wiki-events-snapshot-test-container');

  beforeEach(() => {
    document.body.innerHTML =
    `
    <form action="../" id="signup-form">
      <fieldset>
        <legend>Personal details</legend>
          <ul class=form-fields>
            <li>
                <label for=first-name>First name</label>
                <input type=text class=text-input id=first-name>
            </li>
            <li>
                <label for=last-name>Last name</label>
                <input type=text class=text-input id=last-name>
            </li>
            <li>
                <label for=email>Email</label>
                <input type=email class=text-input id=email>
                <small class=extra-help>.edu emails only</small>
            </li>
          </ul>
      </fieldset>
      <fieldset>
        <legend>Contacting you</legend>
          <p>We may contact you from time to time&hellip;</p>
          <ul class=form-fields>
            <li>
              <span class=label>How would you like to be contacted?</span>
                <ul class=check-list>
                  <li>
                      <input type=checkbox id=by-email> <label for=by-email>By email</label>
                  </li>
                  <li>
                      <input type=checkbox id=by-post> <label for=by-post>By post</label>
                  </li>
                  <li>
                      <input type=checkbox id=by-pigeon> <label for=by-pigeon>By carrier pigeon</label>
                  </li>
                </ul>
              </li>
              <li>
                <span class=label>How often would you like to be contacted?</span>
                <ul class="check-list  multi-list  two-cols">
                    <li>
                        <input type=radio name=frequency id=weekly> <label for=weekly>Weekly</label>
                    </li>
                    <li>
                        <input type=radio name=frequency id=daily> <label for=daily>Daily</label>
                    </li>
                </ul>
              </li>
            </ul>
      </fieldset>
    </form>
    `;
  });

  it('should return empty object when invalid dom node is provided', () => {
    expect(createSnapshot()).toEqual({});
  });

  it('should create snapshot of the given DOM node', () => {
    const snapshot = createSnapshot(document.body);

    expect(snapshot.type).toEqual(Node.ELEMENT_NODE);
    expect(snapshot.__we_id__).not.toBeUndefined();
    expect(snapshot.childNodes.length).toEqual(3);
    expect(snapshot.tagName).toEqual('BODY');
    expect(snapshot.attrs.length).toEqual(1);
    expect(snapshot.attrs[0]).toEqual({
      name: 'className',
      value: 'wiki-events-snapshot-test-container'
    });
  });

  it('should rebuild dom from the given snapshot', () => {
    const snapshot = createSnapshot(document.body);
    const domNode = rebuildSnapshot(snapshot);

    expect(document.body.isEqualNode(domNode)).toBeTruthy();
  });

  it('should return undefined when snapshot is invalid', () => {
    expect(createSnapshot()).toEqual({});
  });
});
