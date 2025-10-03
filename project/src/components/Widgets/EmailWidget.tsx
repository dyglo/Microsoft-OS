import { Mail, Minus } from 'lucide-react';
import { EmailNotification } from '../../types/enhancements';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface EmailWidgetProps {
  emails: EmailNotification[];
  onMarkAsRead: (id: string) => void;
  onRemove: () => void;
}

function EmailWidget({ emails, onMarkAsRead, onRemove }: EmailWidgetProps) {
  const unreadEmails = emails.filter(email => !email.read);
  const displayEmails = unreadEmails.slice(0, 3);

  return (
    <div className="relative bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-sm">
            {unreadEmails.length} New {unreadEmails.length === 1 ? 'mail' : 'mails'}
          </span>
        </div>
        <button
          onClick={onRemove}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title="Remove widget"
        >
          <Minus className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Email List */}
      {displayEmails.length === 0 ? (
        <div className="text-center py-6">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No new emails</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayEmails.map((email) => (
            <button
              key={email.id}
              onClick={() => onMarkAsRead(email.id)}
              className="w-full text-left p-2 hover:bg-gray-50 rounded transition-colors group"
            >
              <div className="flex items-start gap-2">
                {!email.read && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-900 truncate">
                      {email.sender}
                    </span>
                    {email.important && (
                      <span className="text-red-500 text-xs">!</span>
                    )}
                    {email.hasAttachment && (
                      <span className="text-gray-400 text-xs">📎</span>
                    )}
                  </div>
                  <div className="text-xs font-medium text-gray-700 truncate mb-0.5">
                    {email.subject}
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-2">
                    {email.preview}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(email.timestamp)}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {unreadEmails.length > 3 && (
        <div className="mt-3 pt-3 border-t border-gray-100 text-center">
          <span className="text-xs text-gray-500">
            +{unreadEmails.length - 3} more unread
          </span>
        </div>
      )}
    </div>
  );
}

export default EmailWidget;

