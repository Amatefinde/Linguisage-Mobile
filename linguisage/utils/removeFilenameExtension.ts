
export default function (fileName: string) {
    return fileName.replace(/\.(fb2|epub|pdf)$/i, '');
}
