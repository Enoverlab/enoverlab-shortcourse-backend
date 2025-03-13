export declare class createCourseDto {
    title: string;
    description: string;
    price: number;
    instructorName: string;
    courseImg: string;
    courseLevel?: string;
    learningPoints: string[];
}
export declare class createModuleDto {
    title: string;
    content: string;
    lessonvideos: string;
}
export declare class getCourseDto {
    courseId: string;
}
