export const Pomodoro = ({ time }) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    const fmtTime = `${mins}:${secs < 10 ? '0' + secs : secs}`;
    return (
        <div className="my-2 p-2 bg-gray-900 rounded">
            <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                <span>Pomodoro: {fmtTime}</span>
            </div>
        </div>
    );
}