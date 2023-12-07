import React, {useState} from 'react';
import {Offcanvas} from 'react-bootstrap';

const NotificationComponent = () => {
  const [messages, setMessages] = useState([
    {
      senderName: 'John Doe',
      content: 'This is a test notification.',
      time: '2 hours ago',
    },
    {
      senderName: 'Jane Doe',
      content: 'This is another test notification.',
      time: '1 hour ago',
    },
  ]);

  const clearNotification = () => {
    setMessages([]);
  };

  return (
    <Offcanvas show={true}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Notifications</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul className="list-group">
          {messages.map((message, index) => (
            <li key={index} className="list-group-item">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <svg width="16" height="16" fill="currentColor" className="rounded-circle" viewBox="0 0 16 16">
                    <path d="M11.311 8.241c.004.991-.85.635-1.737.445L7.614 7.701a3.809 3.809 0 0 0-1.226.136c-1.324.21-2.458.627-3.159 1.242L1.07 11.26c.075-.279.227-.522.424-.744l4.595-4.595a3.605 3.605 0 0 1 1.223-.136c1.321-.211 2.45-.631 3.153-1.249l2.254-2.254a7.839 7.839 0 0 0 .423-.745L11.311 8.241z" />
                  </svg>
                </div>
                <div className="flex-grow-1">
                  <p className="mb-0">{message.senderName} messaged you:</p>
                  <small className="text-muted">{message.content}</small>
                </div>
                <small className="text-muted">{message.time}</small>
              </div>
            </li>
          ))}
        </ul>
        <button type="button" className="btn btn-primary mt-3" onClick={clearNotification}>
          Clear all
        </button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NotificationComponent;