import React from "react";
import { IUserSense } from "../../../types/UserSensesInterface";
import { Paragraph, View } from "tamagui";

interface IWordStatusProps {
    sense: IUserSense;
}
const WordStatus: React.FC<IWordStatusProps> = ({ sense }) => {
    let statusTag;
    let statusColor;
    if (sense.status === "in_process") {
        statusColor = "#fecf00";
        statusTag = "Current";
    } else if (sense.status === "complete") {
        statusColor = "#0ac000";
        statusTag = "Completed";
    } else {
        statusColor = "#808080";
        statusTag = "Upcoming";
    }

    return (
        <View>
            <Paragraph color={statusColor}>{statusTag}</Paragraph>
        </View>
    );
};

export default WordStatus;
