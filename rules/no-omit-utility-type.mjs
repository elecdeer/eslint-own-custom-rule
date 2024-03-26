import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
// https://zenn.dev/paiza/articles/create-typescript-eslint-custom-rule#%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%AB%E3%83%BC%E3%83%AB%E3%82%92%E4%BD%BF%E3%81%86
const createRule = ESLintUtils.RuleCreator((name) => {
    return `https://example.com/rule/${name}`;
});
export const rule = createRule({
    name: "no-omit-utility-type",
    meta: {
        type: "problem",
        docs: {
            description: "Disallow the use of the `Omit` utility type.",
        },
        messages: {
            noOmitUtilityType: "Do not use the `Omit` utility type.",
        },
        schema: [],
    },
    defaultOptions: [],
    create: (context) => {
        return {
            // ここにルールの実装を書く
            TSTypeReference(node) {
                if (node.typeName.type === AST_NODE_TYPES.Identifier &&
                    node.typeName.name === "Omit") {
                    context.report({
                        node,
                        messageId: "noOmitUtilityType",
                    });
                    // context.report()メソッドを呼び出す
                }
            },
        };
    },
});
