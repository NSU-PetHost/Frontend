import React, { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { Box, Card, CardContent, Button, CircularProgress } from '@mui/material';
import { Save } from '@mui/icons-material';

const MarkdownEditor = ({ initialContent, onSave, isLoading }) => {
    const [value, setValue] = useState(initialContent || '');

    useEffect(() => {
        setValue(initialContent || '');
    }, [initialContent]);

    return (
        <Box display={"flex"} flexDirection={"column"} gap={2}>
            <MDEditor
                value={value}
                onChange={setValue}
                height={500}
                previewOptions={{
                    rehypePlugins: [[rehypeHighlight, { ignoreMissing: true }]],
                    remarkPlugins: [remarkGfm],
                }}
            />

            <Button
                variant="contained"
                color="primary"
                startIcon={isLoading ? <CircularProgress size={20} /> : <Save />}
                onClick={() => onSave(value)}
                disabled={isLoading}
            >
                Сохранить
            </Button>
        </Box>
    );
};

export default MarkdownEditor;