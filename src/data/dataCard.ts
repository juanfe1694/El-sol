import { useNavigation } from "@react-navigation/native"

// const navigation = useNavigation()

export const dataCard = [
    {
        id: 1,
        title: "Planner",
        description: "This section is designed to help users plan and organize their tasks and projects.",
        to: "PlannerScreen",
        icon: "file-tray-full-outline",
        textColor: "#0d3c61",
        entity:["Tasks","Projects","WorkFlows", "Milestones"],
        permissions:"List"
    },
    {
        id: 3,
        title: "Admin",
        description: "User Administration is a section that provides administrators with the tools they need to manage user accounts and permissions.",
        to: "UsersScreen",
        icon: "people-outline",
        textColor: "#f79530",
        entity:["Users","Roles","Permissions"],
        permissions:"List"
    },

]