export default function getVideoEndSeconds(
  startSeconds: number,
  videoDuration = 10
) {
  return startSeconds + videoDuration;
}
